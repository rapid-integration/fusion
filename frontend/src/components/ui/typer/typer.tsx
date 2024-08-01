import { createSignal, mergeProps, onCleanup, onMount, Show, splitProps, ValidComponent } from "solid-js";

import { Polymorphic, PolymorphicProps } from "@kobalte/core";

import { Cursor } from "~/components";
import { cn } from "~/lib/utils";

import { TyperProps, TypingDirection } from "./typer.props";
import { styles } from "./typer.styles";

export const Typer = <T extends ValidComponent = "span">(props: PolymorphicProps<T, TyperProps>) => {
  const mergedProps = mergeProps(
    { typingSpeed: 75, backspaceSpeed: 25, typingPause: 1600, backspacePause: 400, cursor: true, infinite: true },
    props,
  );
  const [local, others] = splitProps(mergedProps, [
    "class",
    "text",
    "infinite",
    "cursor",
    "typingSpeed",
    "backspaceSpeed",
    "typingPause",
    "backspacePause",
  ]);

  const isSingleLine: boolean = typeof local.text === "string";
  const [currentText, setCurrentText] = createSignal<string>("");
  const [currentLine, setCurrentLine] = createSignal<string>("");
  const [currentLineIndex, setCurrentLineIndex] = createSignal<number>(0);
  const [direction, setDirection] = createSignal<TypingDirection>("forwards");
  const [isFinished, setFinished] = createSignal(false);
  const [isPaused, setPaused] = createSignal(false);

  onMount(() => {
    setCurrentLine(typeof local.text === "string" ? local.text : local.text[0]);

    timeLoop(local.typingSpeed);
  });

  onCleanup(() => {
    setFinished(true);
  });

  /**
   * Loop that runs continuously or until the typewrite is finished.
   * @param {number} intervalTime - The time of each timeout interval.
   */
  function timeLoop(intervalTime: number) {
    if (isFinished()) {
      return;
    }

    setTimeout(() => {
      if (isPaused()) {
        setTimeout(
          () => {
            setPaused(false);
            timeLoop(0);
          },
          direction() === "forwards" ? local.backspacePause : local.typingPause,
        );
      } else {
        typewrite();
        timeLoop(direction() === "forwards" ? local.typingSpeed : local.backspaceSpeed);
      }
    }, intervalTime);
  }

  /**
   * Run a single typing animation, forwards or backwards
   */
  function typewrite() {
    direction() === "forwards" ? handleForwardTyping() : handleBackSpace();
  }

  /**
   * Control actions of the typewriter typing forwards. It adds a new character if typing should be continued,
   * otherwise it changes direction to begin typing backward or calls the method to finish typing.
   */
  function handleForwardTyping() {
    // Currently typing forward, so check if it is at the end of the line.
    if (currentText().length === currentLine().length) {
      // The current line is finished, check what needs to be done next.
      if (isSingleLine || currentLineIndex() + 1 === local.text.length) {
        // Currently on final line, so loop it or finish...
        if (local.infinite) {
          // Looping so change the direction to backspace typing
          setDirection("backwards");
          // Since we have changed direction, we could run a pause here...
          setPaused(true);
        } else {
          setFinished(true);
        }
      } else {
        // It must be in a loop, so we can confidently shift to backspace typing...
        setDirection("backwards");
        // Since we have changed direction, we could run a pause here...
        setPaused(true);
      }
    } else {
      // Since we are not at the beginning, simply add a character
      setCurrentText(currentLine().substring(0, currentText().length + 1)); // Update the displayed text
    }
  }

  /**
   * Control actions of the typewriter typing backwards. It removes a single character if characters exist,
   * otherwise it changes direction to begin typing forward and switches to the appropriate line if using
   * multiple lines.
   */
  function handleBackSpace() {
    // Currently typing backward, so check if a line is back at the start.
    if (currentText().length === 0) {
      // Backspace ended, now at start of line
      if (!isSingleLine) {
        // Multiple lines, so we need to change lines.
        if (currentLineIndex() + 1 === local.text.length) {
          // Reset back to the first line
          setCurrentLineIndex(0);
          setCurrentLine(local.text[0]);
        } else {
          // Move to the next line...
          setCurrentLineIndex(currentLineIndex() + 1);
          setCurrentLine(local.text[currentLineIndex()]);
        }
      }
      // We are at the beginning so we need to change direction, and switch lines if using multiple lines
      setDirection("forwards");
      setPaused(true);
    } else {
      setCurrentText(currentLine().substring(0, currentText().length - 1));
    }
  }

  return (
    <Polymorphic as="span" class={cn(styles().root(), local.class)} {...others}>
      {currentText()}
      &ZeroWidthSpace;
      <Show when={local.cursor && !isFinished()}>
        <Cursor blink={isPaused()} class={styles().cursor()} />
      </Show>
    </Polymorphic>
  );
};
