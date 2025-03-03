import { Dispatch, SetStateAction, useCallback } from 'react';

import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconItalic,
  IconLink,
  IconList,
  IconMoodSmileBeam,
  IconStrikethrough,
  IconUnderline,
  IconUnlink,
} from '@tabler/icons-react';
import { type Editor } from '@tiptap/react';

import { MenuBarItem } from './menu-bar-item';

interface MenuBarProps {
  editor: Editor | null;
  setOpenMenuEmoji: Dispatch<SetStateAction<boolean>>;
  isDisabled: boolean;
}

export function MenuBar({
  editor,
  setOpenMenuEmoji,
  isDisabled,
}: MenuBarProps) {
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className='border-b-none flex min-h-[44px] w-full flex-wrap items-center justify-start gap-1 rounded-t-md border-b-transparent bg-gray-300 px-4'>
      <MenuBarItem
        onClick={isDisabled ? () => {} : () => setOpenMenuEmoji(true)}
        isActive={false}
      >
        <IconMoodSmileBeam size={24} />
      </MenuBarItem>
      <div className='flex items-center gap-1 px-4'>
        <MenuBarItem
          onClick={
            isDisabled
              ? () => {}
              : () => editor.chain().focus().toggleBold().run()
          }
          isActive={editor.isActive('bold')}
        >
          <IconBold size={24} />
        </MenuBarItem>

        <MenuBarItem
          onClick={
            isDisabled
              ? () => {}
              : () => editor.chain().focus().toggleItalic().run()
          }
          isActive={editor.isActive('italic')}
        >
          <IconItalic size={24} />
        </MenuBarItem>

        <MenuBarItem
          onClick={
            isDisabled
              ? () => {}
              : () => editor.chain().focus().toggleUnderline().run()
          }
          isActive={editor.isActive('underline')}
        >
          <IconUnderline size={24} />
        </MenuBarItem>

        <MenuBarItem
          onClick={
            isDisabled
              ? () => {}
              : () => editor.chain().focus().toggleStrike().run()
          }
          isActive={editor.isActive('strike')}
        >
          <IconStrikethrough size={24} />
        </MenuBarItem>
      </div>

      <div className='flex items-center gap-1'>
        <MenuBarItem
          onClick={
            isDisabled
              ? () => {}
              : () => editor.chain().focus().setTextAlign('left').run()
          }
          isActive={editor.isActive({ textAlign: 'left' })}
        >
          <IconAlignLeft size={24} />
        </MenuBarItem>

        <MenuBarItem
          onClick={
            isDisabled
              ? () => {}
              : () => editor.chain().focus().setTextAlign('center').run()
          }
          isActive={editor.isActive({ textAlign: 'center' })}
        >
          <IconAlignCenter size={24} />
        </MenuBarItem>

        <MenuBarItem
          onClick={
            isDisabled
              ? () => {}
              : () => editor.chain().focus().setTextAlign('right').run()
          }
          isActive={editor.isActive({ textAlign: 'right' })}
        >
          <IconAlignRight size={24} />
        </MenuBarItem>
      </div>

      <div className='flex items-center gap-1 px-4'>
        <MenuBarItem
          onClick={
            isDisabled
              ? () => {}
              : () => editor.chain().focus().toggleBulletList().run()
          }
          isActive={editor.isActive('bulletList')}
        >
          <IconList />
        </MenuBarItem>
      </div>

      <div className='flex items-center gap-1'>
        <MenuBarItem
          onClick={isDisabled ? () => {} : setLink}
          isActive={editor.isActive('link')}
        >
          <IconLink />
        </MenuBarItem>

        <MenuBarItem
          onClick={
            isDisabled
              ? () => {}
              : () => editor.chain().focus().unsetLink().run()
          }
          isActive={false}
        >
          <IconUnlink />
        </MenuBarItem>
      </div>
    </div>
  );
}
