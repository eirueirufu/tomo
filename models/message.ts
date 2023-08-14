import { Message as aiMessage } from "ai/react";
import { ObjectId } from "mongodb";

export interface Message extends aiMessage {
  assistantId: ObjectId;
}
