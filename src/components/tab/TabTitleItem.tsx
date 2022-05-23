import { Box, Typography } from '@mui/material';
import { FunctionComponent, RefObject } from 'react';

export interface TabProps {
  title: string | JSX.Element;
  isActive?: boolean;
  onClick: () => void;
  position: number;
}

export const TabTitleItem: FunctionComponent<TabProps> = ({
  title,
  isActive = false,
  onClick,
  position
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        boxSizing: 'border-box',
        borderRadius: 100,
        minWidth: 48,
        px: 8,
        py: 1,
        color: 'text.default',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        textAlign: 'center',
        flex: 1,
        '& ~ .glider': {
          transform: isActive ? `translateX(${position * 100}%)` : ''
        }
      }}
    >
      <Typography variant='h6'>
        {title}
      </Typography>
    </Box>
  );
};