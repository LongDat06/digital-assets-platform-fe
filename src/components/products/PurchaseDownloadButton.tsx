import { useEffect, useRef } from 'react';

function PurchaseDownloadButton ({ purchaseId }: { purchaseId: number }) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current && purchaseId) {
      ref.current.setAttribute('data-download-purchase-id-value', String(purchaseId));
    }
  }, [purchaseId]);

  return (
    <button
      ref={ref}
      data-controller="download"
      data-action="click->download#download"
      className="bg-indigo-600 text-white py-2 px-4 rounded-b-lg hover:bg-indigo-700"
    >
      Download
    </button>
  );
}

export default PurchaseDownloadButton 
