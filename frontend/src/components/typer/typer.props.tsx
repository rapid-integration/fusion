import { JSX } from "solid-js";

export type TypingDirection = "forwards" | "backwards";

export type TyperProps = {
  /**
   * A word/sentence or a group of word/sentences that get typed out.
   */
  text: string | string[];

  /**
   * Control whether the typing animation occurs once or continuosly.
   */
  infinite?: boolean;

  /**
   * Whether or not to show the cursor
   */
  cursor?: boolean;

  /**
   * The speed at which the cursor types text forward.
   */
  typingSpeed?: number;

  /**
   * The speed at which the cursor deletes text.
   */
  backspaceSpeed?: number;

  /**
   * A time to pause before beginning to type
   */
  typingPause?: number;

  /**
   * A time to pause before backspacing.
   */
  backspacePause?: number;
} & JSX.StylableSVGAttributes;
