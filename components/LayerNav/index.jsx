import { LAYER } from '@/constants/layer';
import st from './styles.module.scss';

const ITEMS = [
  {
    icon: <span className="material-symbols-outlined">air</span>,
    id: LAYER.air,
    label: 'Air',
  },
  {
    icon: <span className="material-symbols-outlined">directions_boat</span>,
    id: LAYER.cruise,
    label: 'Cruise',
  },
  {
    icon: <span className="material-symbols-outlined">pedal_bike</span>,
    id: LAYER.bike,
    label: 'Bike',
  },
  {
    icon: <span className="material-symbols-outlined">sailing</span>,
    id: LAYER.ferry,
    label: 'Ferry',
  },
];

const LayerNav = ({ onSelect, layers }) => (
  <div className={`${st.layernav} flex`}>
    {ITEMS.map(item => (
      <li
        className={`${st.layernavitem} flex flex-col items-center ${
          layers.includes(item.id) ? `${st.selected} selected` : ''
        }`}
        onClick={() => onSelect(item.id)}
        key={`nav_item_${item.label}`}
        data-test={`nav-${item.id}`}
      >
        {item.icon}
        <div>{item.label}</div>
      </li>
    ))}
  </div>
);

export default LayerNav;
