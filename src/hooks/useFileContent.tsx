import { useEffect, useState } from 'react';

interface FileLoaderType {
  content: string;
  loading: boolean;
}

export default function useFileLoader({ url }: { url: string }): FileLoaderType {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const client = new XMLHttpRequest();
    setLoading(true);
    client.open('GET', url);
    client.onreadystatechange = function () {
      setContent(client.responseText);
      setLoading(false);
    };
    client.send();
  }, [url]);

  return {
    content,
    loading
  };
}
