import { apiClient } from "../api";

type NeedHelpData = { comment: string };

export async function needHelp(data: NeedHelpData) {
  const res = await apiClient.post("/support", data);
  return res.data;
}
