import { Box } from "@mui/material"
import { TabTitleItem } from "./TabTitleItem"

interface TabRadioProps {
    options: { value: any, label: string }[]
    value: string
    onChange: (value: string) => void
}

export const TabRadio = ({ options, value, onChange }: TabRadioProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                overflow: 'hidden',
                '*': {
                    zIndex: 2
                }
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    p: '4px',
                    borderRadius: 100,
                    backgroundColor: 'background.tab',
                    display: 'flex',
                    width: 'fit-content'
                }}
            >
                {options.map((item, index) => (
                    <TabTitleItem
                        onClick={() => {
                            onChange(item.value)
                        }}
                        title={item.label}
                        key={index}
                        isActive={item.value === value}
                        position={index}
                    />
                ))}
                <Box
                    sx={{
                        position: 'absolute',
                        display: 'flex',
                        height: 'calc(100% - 8px)',
                        width: `calc((100% - 8px) / ${options.length})`,
                        backgroundColor: 'background.tabActive',
                        zIndex: 1,
                        borderRadius: 100,
                        transition: '0.25s ease-out'
                    }}
                    className="glider"
                />
            </Box>
        </Box>
    )
}