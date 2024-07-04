import { useState, useEffect } from "react";

import { isbot } from "isbot";

const useIsBot = () => {
  const [isBot, setIsBot] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsBot(isbot(userAgent));
  }, []);

  return isBot;
};

export default useIsBot;
