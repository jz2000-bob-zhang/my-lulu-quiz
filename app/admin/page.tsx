'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function AdminPage() {
  const [isClearing, setIsClearing] = useState(false);
  const [message, setMessage] = useState('');

  const handleClearAll = async () => {
    if (!confirm('确定要删除所有问卷数据吗？此操作不可撤销！')) {
      return;
    }

    setIsClearing(true);
    setMessage('');

    try {
      const response = await fetch('/api/clear-all-quiz', {
        method: 'POST',
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        // Clear browser storage
        sessionStorage.clear();
        localStorage.clear();

        // Redirect to home after 2 seconds
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    } catch (error) {
      setMessage('清空失败：' + String(error));
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#FEF7F5] flex items-center justify-center">
      <Card className="p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#2D2D2D] mb-6">管理面板</h1>

        <div className="space-y-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleClearAll}
            disabled={isClearing}
            className="w-full"
          >
            {isClearing ? '清空中...' : '清空所有问卷数据'}
          </Button>

          {message && (
            <div className="p-4 bg-[#FFF0F5] rounded-2xl text-center">
              <p className="text-[#2D2D2D]">{message}</p>
            </div>
          )}

          <div className="text-sm text-[#717182] text-center">
            <p>此操作会删除数据库中的所有问卷记录</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
