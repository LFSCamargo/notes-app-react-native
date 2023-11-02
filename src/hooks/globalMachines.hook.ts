import { useContext } from 'react'
import { MachinesContext } from '../context'

export function useGlobalMachines() {
  const machines = useContext(MachinesContext);
  
  return machines;
}