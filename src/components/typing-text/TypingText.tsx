import { MutableRefObject, useEffect, useRef } from "react";

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

function TypingText({ textList }) {
  const textRef: MutableRefObject<HTMLSpanElement | null> = useRef(null);

  useEffect(() => {
    const animateText = async () => {
      if (textRef.current) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          for (let i = 0; i < textList.length; i++) {
            await typeWord(textList[i]);
            await timer(1500);
            await deleteWord();
            await timer(500);
          }
        }
      }
    };

    const typeWord = async (word: string) => {
      if (textRef.current) {
        for (let i = 0; i <= word.length; i++) {
          textRef.current.textContent = word.slice(0, i);
          await timer(200);
        }
      }
    };

    const deleteWord = async () => {
      if (textRef.current) {
        const word: string = textRef.current.textContent as string;
        for (let i = word.length; i >= 0; i--) {
          textRef.current.textContent = word.slice(0, i);
          await timer(75);
        }
      }
    };

    animateText();
  }, []);

  return <span ref={textRef}></span>;
}

export default TypingText;
