import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      eventBridge: {
        eventBus:
          "arn:aws:events:us-east-1:282865065290:event-bus/my-event-bus-cursos-dev",
        pattern: {
          "detail-type": ["appointment-updated", "appointment-cancelled"],
        },
      },
    },
  ],
};
