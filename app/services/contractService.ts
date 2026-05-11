import { Client, TaskStatus } from "to_do_list";

export const contractOps = {
  async listTasks(client: Client, offset: number = 0, limit: number = 50) {
    const tx = await client.list_tasks({ offset, limit });
    return tx.result;
  },

  async getTask(client: Client, id: bigint) {
    const tx = await client.get_task({ id });
    return tx.result;
  },

  async createTask(client: Client, title: string) {
    const tx = await client.create_task({ title });
    const result = await tx.signAndSend();
    return result;
  },

  async updateTask(
    client: Client,
    id: bigint,
    title: string,
    status: TaskStatus,
  ) {
    const tx = await client.update_task({ id, title, status });
    const result = await tx.signAndSend();
    return result;
  },

  async setStatus(client: Client, id: bigint, status: TaskStatus) {
    const tx = await client.set_status({ id, status });
    const result = await tx.signAndSend();
    return result;
  },

  async deleteTask(client: Client, id: bigint) {
    const tx = await client.delete_task({ id });
    const result = await tx.signAndSend();
    return result;
  },
};
