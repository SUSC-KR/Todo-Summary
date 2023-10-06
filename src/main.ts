import { DiscordMessageWorker } from './worker/discord/discord-worker';
import { SummaryWorker } from './worker/summary/summary-worker';

async function main() {
  const summaryWorker = new SummaryWorker();
  const discordWorker = new DiscordMessageWorker();

  try {
    const report = await summaryWorker.work();
    await discordWorker.work(report);
  } catch (e) {
    console.error(e);
  }
}

main();
