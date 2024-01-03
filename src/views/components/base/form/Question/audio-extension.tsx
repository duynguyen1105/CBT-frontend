import { Node, mergeAttributes } from '@tiptap/react';

export const AudioNode = Node.create({
  name: 'audio',

  group: 'block',

  content: 'block',

  selectable: true,

  draggable: true,

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
      },
      autoplay: {
        default: undefined,
      },
      muted: {
        default: undefined,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'audio',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['audio', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});

export const SourceNode = Node.create({
  name: 'source',

  group: 'block',

  selectable: false,
  draggable: false,
  allowGapCursor: false,

  addAttributes() {
    return {
      src: {
        default: undefined,
      },
      type: {
        default: undefined,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'source',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['source', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
});
