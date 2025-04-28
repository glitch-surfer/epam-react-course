import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";
import { useState } from "react";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const ExampleContent = () => (
  <div className="space-y-4">
    <p>
      This is an example of dialog content. You can put any React components
      here.
    </p>
    <div className="flex space-x-4">some more content</div>
  </div>
);

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Dialog Title",
    children: <ExampleContent />,
    onClose: () => console.log("Close clicked"),
  },
};

export const Interactive = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Dialog
      </button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Dialog"
      >
        <ExampleContent />
      </Dialog>
    </div>
  );
};

export const WithJSXTitle: Story = {
  args: {
    isOpen: true,
    title: (
      <div className="flex items-center space-x-2">
        <svg
          className="w-6 h-6 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        <span>Custom Title with Icon</span>
      </div>
    ),
    children: <ExampleContent />,
    onClose: () => console.log("Close clicked"),
  },
};
