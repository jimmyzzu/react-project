import React from 'react';

function ApprovalForm({ reviewer, comment, statusTo, onReviewerChange, onCommentChange, onStatusChange, onSubmit, submitDisabled }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">审批人</label>
          <input className="w-full border rounded p-2" value={reviewer} onChange={e => onReviewerChange?.(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">审批意见</label>
          <input className="w-full border rounded p-2" value={comment} onChange={e => onCommentChange?.(e.target.value)} />
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={onSubmit} disabled={submitDisabled} className={`px-4 py-2 rounded text-white ${submitDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>提交审批</button>
        <select className="border rounded p-2" value={statusTo} onChange={e => onStatusChange?.(e.target.value)}>
          <option value="processing">处理中</option>
          <option value="approved">审批完成</option>
          <option value="rejected">驳回修改</option>
        </select>
      </div>
    </div>
  );
}

export default ApprovalForm;


