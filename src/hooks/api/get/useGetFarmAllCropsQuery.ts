import { useQuery } from "@tanstack/react-query";
import { FarmService } from "../../../api/openapi";
export const GET_FARM_ALL_CROP = () => "GET_FARM_ALL_CROP_KEY";

export default function useGetFarmAllCropsQuery() {
  return useQuery({
    queryKey: [GET_FARM_ALL_CROP()],
    queryFn: async () => {
      const data = await FarmService.getApiFarmCropFind();
      return data;
    },
    keepPreviousData: true
  });
}
