import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../TaskList';

// Mock console.log and window.confirm
const originalConsoleLog = console.log;
const originalConfirm = window.confirm;

beforeAll(() => {
  console.log = jest.fn();
  window.confirm = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
  window.confirm = originalConfirm;
});

describe('TaskList', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty state when no tasks', () => {
    render(<TaskList tasks={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('暂无任务')).toBeInTheDocument();
  });

  test('renders task list when tasks exist', () => {
    const tasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: 'pending' },
      { id: 2, title: 'Task 2', description: 'Description 2', status: 'completed' }
    ];
    
    render(<TaskList tasks={tasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('状态：pending')).toBeInTheDocument();
    
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('状态：completed')).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    const tasks = [{ id: 1, title: 'Task 1', description: 'Description 1', status: 'pending' }];
    
    render(<TaskList tasks={tasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const editButton = screen.getByText('编辑');
    fireEvent.click(editButton);
    
    expect(mockOnEdit).toHaveBeenCalledWith(tasks[0]);
  });

  test('calls onDelete when delete button is clicked and user confirms', () => {
    const tasks = [{ id: 1, title: 'Task 1', description: 'Description 1', status: 'pending' }];
    window.confirm.mockReturnValue(true);
    
    render(<TaskList tasks={tasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByText('删除');
    fireEvent.click(deleteButton);
    
    expect(window.confirm).toHaveBeenCalledWith('确定要删除这个任务吗？');
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test('does not call onDelete when user cancels confirmation', () => {
    const tasks = [{ id: 1, title: 'Task 1', description: 'Description 1', status: 'pending' }];
    window.confirm.mockReturnValue(false);
    
    render(<TaskList tasks={tasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByText('删除');
    fireEvent.click(deleteButton);
    
    expect(window.confirm).toHaveBeenCalledWith('确定要删除这个任务吗？');
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  test('renders multiple tasks with correct edit and delete buttons', () => {
    const tasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: 'pending' },
      { id: 2, title: 'Task 2', description: 'Description 2', status: 'completed' }
    ];
    
    render(<TaskList tasks={tasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const editButtons = screen.getAllByText('编辑');
    const deleteButtons = screen.getAllByText('删除');
    
    expect(editButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });

  test('displays task status correctly', () => {
    const tasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: 'pending' },
      { id: 2, title: 'Task 2', description: 'Description 2', status: 'completed' }
    ];
    
    render(<TaskList tasks={tasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('状态：pending')).toBeInTheDocument();
    expect(screen.getByText('状态：completed')).toBeInTheDocument();
  });
});
