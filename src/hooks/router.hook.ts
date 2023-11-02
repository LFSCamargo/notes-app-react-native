import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";

export function useRouter() {
  return useNavigation<NavigationProp<RootStackParamList>>();
}