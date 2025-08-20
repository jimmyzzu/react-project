import React, { useEffect, useState } from 'react';
import { approvalsApi, tasksApi } from '../utils/api';
import Pagination from '../components/common/Pagination';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import TaskQueueList from '../components/approvals/TaskQueueList';
import ApprovalForm from '../components/approvals/ApprovalForm';
import ApprovalRecords from '../components/approvals/ApprovalRecords';

function ApprovalPage() {
  const [taskId, setTaskId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [reviewer, setReviewer] = useState('');
  const [comment, setComment] = useState('');
  const [records, setRecords] = useState([]);
  const [statusTo, setStatusTo] = useState('processing');
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 5;

  const loadQueue = async (page = 1) => {
    const r = await tasksApi.getForReviewerPaged({ pageNo: page, pageSize, status: 'submitted' });
    setTasks(r.data?.items || []);
    setTotal(r.data?.total || 0);
    setPageNo(r.data?.pageNo || page);
  };

  useEffect(() => {
    loadQueue(1).catch(() => {});
  }, []);

  const loadRecords = async (tid) => {
    if (!tid) return;
    const res = await approvalsApi.listByTask(tid);
    setRecords(res.data || []);
  };

  const submit = async () => {
    if (!taskId) return;
    await approvalsApi.submit({ taskId: Number(taskId), reviewer, comment });
    setReviewer('');
    setComment('');
    loadRecords(Number(taskId));
  };

  const changeStatus = async (id) => {
    await approvalsApi.changeStatus(id, { status: statusTo, comment });
    setComment('');
    loadRecords(Number(taskId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <PageHeader title="任务审批" right={null} />

        <Card className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-2">待审核任务</label>
              <TaskQueueList
                tasks={tasks}
                selectedTaskId={taskId}
                onSelect={(t) => { setTaskId(String(t.id)); loadRecords(t.id); }}
              />
              <div className="mt-3">
                <Pagination pageNo={pageNo} pageSize={pageSize} total={total} onChange={(n) => loadQueue(n)} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">审批操作</label>
              <ApprovalForm
                reviewer={reviewer}
                comment={comment}
                statusTo={statusTo}
                onReviewerChange={setReviewer}
                onCommentChange={setComment}
                onStatusChange={setStatusTo}
                onSubmit={submit}
                submitDisabled={!taskId}
              />
            </div>
          </div>
        </Card>

        <Card title="审批记录" className="mt-6">
          <ApprovalRecords
            records={records}
            onUpdateStatus={(id) => changeStatus(id)}
            nextStatusLabel={statusTo}
          />
        </Card>
      </div>
    </div>
  );
}

export default ApprovalPage;


