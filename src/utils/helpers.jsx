import { CoffeeOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';

export const getStatusTagColor = (status) => {
    switch (status) {
        case 'NOT CONFIRMED':
            return 'orange';
        case 'CONFIRMED':
            return 'blue';
        case 'SEATED':
            return 'yellow';
        case 'CHECKED OUT':
            return 'green';
        default:
            return 'blue';
    }
}

export const getShiftIcon = (shift) => {
    const icons = {
        'BREAKFAST': <CoffeeOutlined />,
        'LUNCH': <SunOutlined />,
        'DINNER': <MoonOutlined />,
    };

    return icons[shift] || <SunOutlined />;
}
