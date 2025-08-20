import React, { useState } from 'react';
import { eventsApi } from '../utils/api';
import PageHeader from '../components/common/PageHeader';

function ActivityStreamPage() {
  const [payload, setPayload] = useState({ type: 'TASK_CREATED', title: '示例任务', user: 'demo' });
  const [status, setStatus] = useState('');

  const send = async () => {
    try {
      setStatus('正在发送...');
      await eventsApi.sendTaskEvent(payload);
      setStatus('已发送到 Kafka');
    } catch (e) {
      setStatus('发送失败');
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4 md:p-6">
        <PageHeader title="活动事件流（Kafka 演示）" right={<button onClick={send} className="px-3 py-2 rounded bg-white shadow hover:bg-gray-50">发送事件</button>} />

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">事件类型</label>
            <input className="w-full border rounded p-2" value={payload.type} onChange={e => setPayload({ ...payload, type: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">标题</label>
            <input className="w-full border rounded p-2" value={payload.title} onChange={e => setPayload({ ...payload, title: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">用户</label>
            <input className="w-full border rounded p-2" value={payload.user} onChange={e => setPayload({ ...payload, user: e.target.value })} />
          </div>
          <div className="text-sm text-gray-600">{status}</div>
        </div>
      </div>
    </div>
  );
}

export default ActivityStreamPage;


