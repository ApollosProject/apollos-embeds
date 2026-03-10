import React from "react";

import { render, screen } from "@testing-library/react";

import VideoPlayer from "../../packages/web-shared/components/VideoPlayer/VideoPlayer";

jest.mock(
  "../../packages/web-shared/components/VideoPlayer/VideoPlayer.styles",
  () => ({
    ...(() => {
      const React = require("react");

      return {
        EmbededPlayer: ({ children }) => <div>{children}</div>,
        VideoPlayer: React.forwardRef(({ children, url }, ref) => (
          <div data-testid="player-shell" data-url={url} ref={ref}>
            {children}
          </div>
        )),
      };
    })(),
  })
);

jest.mock("../../packages/web-shared/hooks", () => ({
  useHTMLContent: () => (html) => html,
  useInteractWithNode: () => [jest.fn()],
  useLivestreamStatus: () => ({ status: "isNotLive" }),
}));

jest.mock("../../packages/web-shared/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({
    track: jest.fn(),
  }),
}));

jest.mock("../../packages/web-shared/ui-kit", () => ({
  Box: ({ children }) => <div>{children}</div>,
}));

describe("VideoPlayer", () => {
  it("renders an MP3 source for legacy embeds", () => {
    render(
      <VideoPlayer
        coverImage="https://example.com/cover.jpg"
        parentNode={{
          id: "content-1",
          publishDate: "0",
          title: "Audio content",
          videos: [
            {
              id: "video-1",
              sources: [{ uri: "https://example.com/audio.mp3" }],
            },
          ],
        }}
        userProgress={{ complete: false, playhead: 0 }}
      />
    );

    expect(screen.getByTestId("player-shell")).toHaveAttribute(
      "data-url",
      "https://example.com/audio.mp3"
    );
  });
});
