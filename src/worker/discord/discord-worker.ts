import { Configuration } from '../../config';
import { SummaryReport } from '../summary-report';
import {
  Channel,
  Client,
  GatewayIntentBits,
  TextBasedChannel,
} from 'discord.js';
import { ReportBuilder } from './report-builder';

export class DiscordMessageWorker {
  private reportBuilder: ReportBuilder;

  constructor() {
    this.reportBuilder = new ReportBuilder();
  }

  async work(report: SummaryReport): Promise<void> {
    const { discordBotToken, teamIds } = Configuration;

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    await client.login(discordBotToken);
    await this.waitForReady(client);

    try {
      for (const teamId of teamIds) {
        const channelId = '1142149381764698166';

        const teamSummary = report.find((summary) => summary.teamId === teamId);

        if (!teamSummary) {
          continue;
        }

        for (const summary of teamSummary.summary) {
          await this.sendMessage(
            client,
            channelId,
            this.reportBuilder.build(teamId, summary),
          );
        }
      }
    } catch (e) {
      console.error(e);
    }

    await client.destroy();
  }

  private async sendMessage(
    client: Client,
    channelId: string,
    message: string,
  ): Promise<void> {
    const channel: Channel | undefined = client.channels.cache.get(channelId);
    if (!channel) {
      console.error('Channel not found for give id.');
      return;
    }

    if (!channel.isTextBased()) {
      console.error('Channel is not text based.');
      return;
    }

    const textChannel: TextBasedChannel = channel as TextBasedChannel;
    await textChannel.send(message);
  }

  private async waitForReady(client: Client): Promise<void> {
    await new Promise<void>((resolve) => client.on('ready', () => resolve()));
  }
}
