import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function Post({ item }) {
  function handleSil() {
    // burada ilgili actionı dispatch et
  }

  return (
    <div className="beyazKutu p-8 pb-6 mb-4 text-sm" data-testid="post-item">
      <h1>
        {formatDistanceToNow(new Date(item.created_at), {
          addSuffix: true,
          locale: tr,
        })}
      </h1>

      {item.body.split('|').map((li) => (
        <p className="mt-2" key={li}>
          - {li}
        </p>
      ))}

      <button
        data-testid={`item-${item.id}`}
        className="text-xs text-amber-600 mt-4 underline"
        onClick={handleSil}
      >
        Bu notu sil
      </button>
    </div>
  );
}
