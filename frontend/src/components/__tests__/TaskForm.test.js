import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from '../TaskForm';

// Mock console.log to avoid cluttering test output
const originalConsoleLog = console.log;
beforeAll(() => {
  console.log = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
});

describe('TaskForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields', () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    expect(screen.getByPlaceholderText('任务标题')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('任务描述')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('创建')).toBeInTheDocument();
  });

  test('shows create button when not editing', () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    expect(screen.getByText('创建')).toBeInTheDocument();
    expect(screen.queryByText('保存')).not.toBeInTheDocument();
    expect(screen.queryByText('取消')).not.toBeInTheDocument();
  });

  test('shows save and cancel buttons when editing', () => {
    const editingTask = { id: 1, title: 'Test Task', description: 'Test Description', status: 'pending' };
    render(<TaskForm onSubmit={mockOnSubmit} editing={editingTask} onCancel={mockOnCancel} />);
    
    expect(screen.getByText('保存')).toBeInTheDocument();
    expect(screen.getByText('取消')).toBeInTheDocument();
    expect(screen.queryByText('创建')).not.toBeInTheDocument();
  });

  test('populates form fields when editing', () => {
    const editingTask = { id: 1, title: 'Test Task', description: 'Test Description', status: 'completed' };
    render(<TaskForm onSubmit={mockOnSubmit} editing={editingTask} onCancel={mockOnCancel} />);
    
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('completed')).toBeInTheDocument();
  });

  test('submits form with correct data', async () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const titleInput = screen.getByPlaceholderText('任务标题');
    const descriptionInput = screen.getByPlaceholderText('任务描述');
    const statusSelect = screen.getByRole('combobox');
    const submitButton = screen.getByText('创建');

    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.change(statusSelect, { target: { value: 'completed' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'New Task',
        description: 'New Description',
        status: 'completed'
      });
    });
  });

  test('does not submit when title is empty', () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const submitButton = screen.getByText('创建');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('calls onCancel when cancel button is clicked', () => {
    const editingTask = { id: 1, title: 'Test Task', description: 'Test Description', status: 'pending' };
    render(<TaskForm onSubmit={mockOnSubmit} editing={editingTask} onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByText('取消');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('updates form state when input changes', () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const titleInput = screen.getByPlaceholderText('任务标题');
    const descriptionInput = screen.getByPlaceholderText('任务描述');

    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });

    expect(titleInput.value).toBe('Updated Title');
    expect(descriptionInput.value).toBe('Updated Description');
  });
});
