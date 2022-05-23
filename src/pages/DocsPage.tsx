import useFileLoader from '@/hooks/useFileContent';
import Logo from '@/components/logo/Logo';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Loading } from '@/components/elements/Loading';
import { useRouter } from 'next/router';
/**
 * Component Specific modules
 * 
 * react-syntax-highlighter
 * @types/react-syntax-highlighter
 * remark-gfm
 * react-markdown
 */
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ReactMarkdown from "react-markdown";
export const menu: ListItemType[] = [
  { title: 'Overview', url: '/docs/README.md' },
];
export interface ListItemType {
  title: string;
  url?: string;
  list?: ListItemType[];
}

function ListItem({ item, handleMenuItemClick, url }: { item: ListItemType; handleMenuItemClick: (url: string) => void; url: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function checkOpen(_item: ListItemType): boolean {
      if (_item.url) {
        return _item.url === url;
      }
      if (_item.list) {
        for (const u of _item.list) {
          if (checkOpen(u)) {
            return checkOpen(u);
          }
        }
      }
      return false;
    }
    setOpen(checkOpen(item));
  }, [url, item]);

  const handleItemClick = () => {
    if (item.url) {
      router.push('/docs?doc=' + encodeURIComponent(item.url));
    } else {
      setOpen((prevState) => !prevState);
    }
  };

  return (
    <Box className="list-item">
      <Box className="menu-item" onClick={handleItemClick} data-open={open} data-active={url === item.url}>
        {item.list ? <Typography variant='h5'>{item.title}</Typography> : <Typography variant='h6'>{item.title}</Typography>}
        {item.list && <ChevronRightIcon />}
      </Box>
      <Box className="menu-list" data-open={open}>
        {item.list?.map((t, i) => (
          <ListItem item={t} url={url} key={i.toString()} handleMenuItemClick={handleMenuItemClick} />
        ))}
      </Box>
    </Box>
  );
}

export default function DocsPage() {
  const [url, setUrl] = useState<string>('/docs/README.md');
  const { content, loading } = useFileLoader({ url });
  const router = useRouter()
  const params = router.query as { doc: string };
  useEffect(() => {
    if (params.doc) {
      setUrl(decodeURIComponent(params.doc));
    }
  }, [params]);

  const handleMenuItemClick = (url: string) => {
    setUrl(url);
  };

  return (
    <Box className='docs-page'>
      <Box className="side-bar" sx={{ p: 4 }}>
        <Box className="flex-center py-2 position-sticky bg-white" sx={{ zIndex: 1, mb: 10 }}>
          <Logo />
        </Box>
        <Box className="py-2">
          {menu.map((menuItem, index) => (
            <ListItem key={index.toString()} url={url} item={menuItem} handleMenuItemClick={handleMenuItemClick} />
          ))}
        </Box>
      </Box>
      <Box className="content" sx={{ px: 10 }}>
        <Box className="container">
          <Box className="doc-page" sx={{ color: 'text.default' }}>
            {loading ? (
              <Loading />
            ) : (
              <ReactMarkdown
                children={content}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter children={String(children).replace(/\n$/, '')} language={match[1]} style={darcula} />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
                remarkPlugins={[remarkGfm]}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}