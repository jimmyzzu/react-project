import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { llmApi } from '../utils/api';

function LlmPage() {
  const [text, setText] = useState('');
  const [resp, setResp] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true);
    setResp('');
    try {
      const r = await llmApi.complete(text);
      setResp(typeof r.data === 'string' ? r.data : JSON.stringify(r.data));
    } catch (e) {
      setResp('请求失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <PageHeader title="大语言模型演示" right={<button onClick={send} disabled={loading} className="px-3 py-2 rounded bg-white shadow hover:bg-gray-50 disabled:opacity-60">{loading ? '发送中...' : '发送'}</button>} />

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">输入内容</label>
            <textarea className="w-full border rounded p-3 min-h-[120px]" value={text} onChange={e => setText(e.target.value)} placeholder="请输入要发送给 LLM 的内容" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">返回内容</label>
            <pre className="w-full border rounded p-3 bg-gray-50 whitespace-pre-wrap break-words min-h-[120px]">{resp}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LlmPage;


