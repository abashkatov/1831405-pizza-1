import resources from "@/common/enums/resources";
import { AuthApiService } from "@/services/api.service";

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
  };
};
