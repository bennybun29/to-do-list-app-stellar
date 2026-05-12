import { Client, TaskStatus } from "to_do_list_v2";

export const contractOps = {
  async listTasks(
    client: Client,
    user: string,
    offset: number = 0,
    limit: number = 50,
  ) {
    const tx = await client.list_tasks({ user, offset, limit });
    return tx.result;
  },

  async getTask(client: Client, user: string, id: bigint) {
    const tx = await client.get_task({ user, id });
    return tx.result;
  },

  async createTask(client: Client, user: string, title: string) {
    const tx = await client.create_task({ user, title });
    const result = await tx.signAndSend();
    return result;
  },

  async updateTask(
    client: Client,
    user: string,
    id: bigint,
    title: string,
    status: TaskStatus,
  ) {
    const tx = await client.update_task({ user, id, title, status });
    const result = await tx.signAndSend();
    return result;
  },

  async setStatus(
    client: Client,
    user: string,
    id: bigint,
    status: TaskStatus,
  ) {
    const tx = await client.set_status({ user, id, status });
    const result = await tx.signAndSend();
    return result;
  },

  async deleteTask(client: Client, user: string, id: bigint) {
    const tx = await client.delete_task({ user, id });
    const result = await tx.signAndSend();
    return result;
  },
};
