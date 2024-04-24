import { Input, DatePicker, Select, Button } from 'antd';
import { reservations } from '@/data';
import {
  SearchOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { statusEnum, shiftEnum, areaEnum } from '@/utils/enums';
import dayjs from 'dayjs';
import './style.scss';

function FilterBar() {
  const dispatch = useDispatch();
  const { search, filters } = useSelector((state) => state.reservations);

  const handleSearch = (e) => {
    dispatch({
      type: 'reservations/SET_SEARCH',
      payload: {
        search: e.target.value,
        reservations,
      },
    });
  };

  const handleFilterChange = (value, type) => {
    dispatch({
      type: 'reservations/SET_FILTERS',
      payload: {
        filterType: type,
        filterValue: value,
        reservations,
      },
    });
  };

  const handleApplyFilters = () => {
    dispatch({
      type: 'reservations/FILTER_RESERVATIONS',
      payload: {
        reservations,
      },
    });
  };

  const handleResetFilters = () => {
    dispatch({
      type: 'reservations/RESET_FILTERS',
      payload: {
        reservations,
      },
    });
  };

  const statusOptions = Object.keys(statusEnum)?.map((key) => ({
    label: statusEnum[key]?.toLowerCase(),
    value: statusEnum[key],
  }));

  const shiftOptions = Object.keys(shiftEnum)?.map((key) => ({
    label: shiftEnum[key]?.toLowerCase(),
    value: shiftEnum[key],
  }));

  const areaOptions = Object.keys(areaEnum)?.map((key) => ({
    label: areaEnum[key]?.toLowerCase(),
    value: areaEnum[key],
  }));

  return (
    <>
      <div className='d-flex justify-content-between border border-2 border-light rounded p-3 mx-3 '>
        <Input
          style={{ width: '19rem', height: '2rem' }}
          size='large'
          placeholder={'Search...'}
          suffix={<SearchOutlined />}
          value={search}
          onChange={handleSearch}
        />
        <div className='d-flex gap-2 ms-auto'>
          <DatePicker
            style={{ width: 200, height: 31 }}
            allowClear
            format='DD, MMMM, YYYY'
            picker='day'
            size='large'
            onChange={(value) => handleFilterChange(value, 'date')}
            value={filters?.date ? dayjs(filters?.date) : null}
          />
          <Select
            className='select-custom'
            popupClassName='custom-drop-down'
            allowClear
            placeholder={'Status'}
            options={statusOptions}
            onChange={(value) => handleFilterChange(value, 'status')}
            value={filters?.status || undefined}
          />
          <Select
            className='select-custom'
            popupClassName='custom-drop-down'
            allowClear
            placeholder={'Shift'}
            options={shiftOptions}
            onChange={(value) => handleFilterChange(value, 'shift')}
            value={filters?.shift || undefined}
          />
          <Select
            className='select-custom'
            popupClassName='custom-drop-down'
            allowClear
            placeholder={'Area'}
            options={areaOptions}
            onChange={(value) => handleFilterChange(value, 'area')}
            value={filters?.area || undefined}
          />

          <Button
            className='d-flex align-items-center filter-bar__btn filter-bar__btn--primary'
            icon={<CheckCircleFilled />}
            onClick={handleApplyFilters}
            type='primary'
          >
            Apply filters
          </Button>

          <Button
            className='d-flex align-items-center filter-bar__btn'
            icon={<CloseCircleFilled />}
            onClick={handleResetFilters}
          >
            Reset filters
          </Button>
          </div>

      </div>
    </>
  );
}

export default FilterBar;
