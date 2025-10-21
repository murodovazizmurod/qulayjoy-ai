import * as Types from '../types';
import * as Context from '../context';

interface IReturn extends Types.IContext.State {}

const useAuth = (): IReturn => {
  const { state } = Context.useContext();

  return state;
};

export default useAuth;
