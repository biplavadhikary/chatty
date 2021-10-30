export const smoothScrollToBottomFunc = (elementRef) => {
  if (elementRef.current) {
    const initalPosition = elementRef.current.scrollTop;
    elementRef.current.scrollTo(
      initalPosition,
      elementRef.current.scrollHeight
    );
  }
};
