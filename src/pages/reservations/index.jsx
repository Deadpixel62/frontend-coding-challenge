import {useEffect} from 'react'
import { reservations } from "@/data";
import columns from './columns';
import { Table } from 'antd';
import { PageLayout } from "@/layouts";
import { FilterBar } from "@/components";
import { useDispatch, useSelector } from "react-redux";



function Reservations() {
const dispatch = useDispatch();

useEffect(() => {
  dispatch({
    type: 'reservations/GET_RESERVATIONS',
    payload: reservations,
  })
}, []);

  const {data} = useSelector(state => state.reservations)

  return (
    <PageLayout title='Reservations'>
    <FilterBar/>
      <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      className="p-3"
    />
    </PageLayout>
  )
}

export default Reservations;
