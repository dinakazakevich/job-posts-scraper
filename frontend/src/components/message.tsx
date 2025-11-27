import React, { useEffect, useState } from 'react';

export function Message() {
  const [message, setMessage] = useState<string>('Loading...');
  useEffect(() => {
    fetch('/api/example')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage(`Error: ${error.message}`));
  }, []);
  return <p>{`New Message: ${message}`}</p>;
}
