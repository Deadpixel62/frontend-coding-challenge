import dayjs from 'dayjs';
import { Tag } from 'antd';
import {getStatusTagColor, getShiftIcon} from '@/utils/helpers'

const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
       sorter: (a, b) => `${a.customer.firstName} ${a.customer.lastName}`.localeCompare(`${b.customer.firstName} ${b.customer.lastName}`),
      render: customer => `${customer.firstName} ${customer.lastName}`
    },
    {
      title: 'Business Date',
      dataIndex: 'businessDate',
      key: 'businessDate',
      sorter: (a, b) => (dayjs(a.start).isAfter(dayjs(b.start)) ? 1 : -1),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
      width: 150,
      render: (shift) => {
        const shiftIcon = getShiftIcon(shift);
        return (
          <div className="d-flex align-items-center gap-3">
            {shiftIcon}
            {shift?.toLowerCase()}
          </div>
        );
      },
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: status => <Tag color={getStatusTagColor(status)}>{status}</Tag>,

    },
    {
      title: 'Start date',
      dataIndex: 'start',
      key: 'start',
      sorter: (a, b) => (dayjs(a.start).isAfter(dayjs(b.start)) ? 1 : -1),
      render: start => new Date(start).toLocaleTimeString('en-US', { month: 'long',day: 'numeric',  year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
    },
    {
      title: 'End date',
      dataIndex: 'end',
      key: 'end',
      sorter: (a, b) => (dayjs(a.end).isAfter(dayjs(b.end)) ? 1 : -1),
      render: end => new Date(end).toLocaleTimeString('en-US', { month: 'long',day: 'numeric',  year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
    },
    {
      title: 'Guest Notes',
      dataIndex: 'guestNotes',
      key: 'guestNotes'
    }
  ];

  export default columns;