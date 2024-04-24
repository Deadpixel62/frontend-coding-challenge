/* eslint-disable react/prop-types */
import { Typography, Image } from 'antd';
import logoTitle from '@/assets/icons/yassir-forward.png';
import './style.scss';

const { Title } = Typography;

function Banner({ title }) {
  return (
    <div className='banner py-3'>
      <div className="banner--title">
        <Image preview={false} className="logo" width={100}  src={logoTitle} />
        <Title className="banner--title--text" level={2}>{title}</Title>
      </div>
    </div>
  );
}

export default Banner;
