import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

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
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import EmojiPicker from 'emoji-picker-react';

import '@styles/tiptap.css';

import { FormEditorProps, FormEditorRefProps } from './form-editor.types';

const MenuBar: FC<any> = ({ editor, setOpenMenuEmoji }) => {
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
    <div className='border-b-none flex min-h-[44px] w-full flex-wrap items-center justify-start gap-1 rounded-t-md border-b-transparent px-4 bg-gray-300'>
      <button
        type='button'
        className='text-gray-700 rounded-md w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200'
        onClick={() => setOpenMenuEmoji(true)}
      >
        <IconMoodSmileBeam size={24} />
      </button>
      <div className='px-4 flex gap-1 items-center'>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${
            editor.isActive('bold') && 'text-gray-800 bg-gray-200 '
          } text-gray-700 rounded-md w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200`}
        >
          <IconBold size={24} />
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${
            editor.isActive('italic') && 'text-gray-800 bg-gray-200'
          } text-gray-700 rounded-md w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200`}
        >
          <IconItalic size={24} />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${
            editor.isActive('underline') && 'text-gray-800 bg-gray-200'
          } text-gray-700 rounded-md w-8 h-8 flex items-center justify-center hover:bg-gray-200 cursor-pointer`}
        >
          <IconUnderline size={24} />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${
            editor.isActive('strike') && 'text-gray-800 bg-gray-200'
          } text-gray-700 rounded-md w-8 h-8 flex items-center justify-center hover:bg-gray-200 cursor-pointer`}
        >
          <IconStrikethrough size={24} />
        </button>
      </div>
      <div className='flex gap-1 items-center'>
        <button
          type='button'
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`${
            editor.isActive({ textAlign: 'left' }) &&
            'text-gray-800 bg-gray-200'
          } text-gray-700 rounded-md w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200`}
        >
          <IconAlignLeft size={24} />
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`${
            editor.isActive({ textAlign: 'center' }) &&
            'text-gray-800 bg-gray-200'
          } text-gray-700 rounded-md w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200`}
        >
          <IconAlignCenter size={24} />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`${
            editor.isActive({ textAlign: 'right' }) &&
            'text-gray-800 bg-gray-200'
          } text-gray-700 rounded-md w-8 h-8 flex items-center justify-center hover:bg-gray-200 cursor-pointer`}
        >
          <IconAlignRight size={24} />
        </button>
      </div>

      <div className='px-4 flex gap-1 items-center'>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${
            editor.isActive('bulletList') && 'text-gray-800 bg-gray-200'
          } text-gray-700 rounded-md w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200`}
        >
          <IconList />
        </button>
      </div>

      <div className='flex gap-1 items-center'>
        <button
          type='button'
          onClick={setLink}
          className={`${
            editor.isActive('link') && 'text-gray-800 bg-gray-200'
          } text-gray-700 rounded-md w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200`}
        >
          <IconLink />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          className={
            'text-gray-700 rounded-md w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200'
          }
        >
          <IconUnlink />
        </button>
      </div>
    </div>
  );
};

export const FormEditor = forwardRef<FormEditorRefProps, FormEditorProps>(
  (
    {
      setUpdateHtmlContent,
      htmlContentInitial,
      dataTestid,
      label,
      error,
      name,
      height,
      maxLength = 500,
      placeholder = '',
    },
    ref
  ) => {
    const [openModalEmoji, setOpenMenuEmoji] = useState(false);
    const [saveInitialValue, setSaveInitialValue] = useState<string | null>(
      null
    );

    const editor: any = useEditor({
      extensions: [
        Document,
        Text,
        BulletList,
        Link.configure({
          openOnClick: false,
          autolink: true,
          defaultProtocol: 'https',
          protocols: ['http', 'https'],
          isAllowedUri: (url, ctx) => {
            try {
              // construct URL
              const parsedUrl = url.includes(':')
                ? new URL(url)
                : new URL(`${ctx.defaultProtocol}://${url}`);

              // use default validation
              if (!ctx.defaultValidate(parsedUrl.href)) {
                return false;
              }

              // disallowed protocols
              const disallowedProtocols = ['ftp', 'file', 'mailto'];
              const protocol = parsedUrl.protocol.replace(':', '');

              if (disallowedProtocols.includes(protocol)) {
                return false;
              }

              // only allow protocols specified in ctx.protocols
              const allowedProtocols = ctx.protocols.map((p) =>
                typeof p === 'string' ? p : p.scheme
              );

              if (!allowedProtocols.includes(protocol)) {
                return false;
              }

              // disallowed domains
              const disallowedDomains = [
                'example-phishing.com',
                'malicious-site.net',
              ];
              const domain = parsedUrl.hostname;

              if (disallowedDomains.includes(domain)) {
                return false;
              }

              // all checks have passed
              return true;
            } catch {
              return false;
            }
          },
          shouldAutoLink: (url) => {
            try {
              // construct URL
              const parsedUrl = url.includes(':')
                ? new URL(url)
                : new URL(`https://${url}`);

              // only auto-link if the domain is not in the disallowed list
              const disallowedDomains = [
                'example-no-autolink.com',
                'another-no-autolink.com',
              ];
              const domain = parsedUrl.hostname;

              return !disallowedDomains.includes(domain);
            } catch {
              return false;
            }
          },
        }),
        Underline,
        Placeholder.configure({
          placeholder,
        }),
        Heading.configure({
          levels: [4, 5, 6],
        }),
        CharacterCount.configure({
          limit: maxLength,
        }),
        TextStyle.configure(),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: true,
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: true,
          },
        }),
      ],
      injectCSS: false,
      autofocus: false,

      editorProps: {
        attributes: {
          class:
            ' max-w-full m-1 h-full focus:outline-none leading-3 break-all whitespace-normal',
        },
      },
      content: htmlContentInitial,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        setUpdateHtmlContent(html);
      },
    });

    useImperativeHandle(ref, () => ({
      cleanEditor() {
        if (editor) editor.commands.setContent('');
        setSaveInitialValue('');
      },
    }));

    const charactersRemaining = () => {
      return maxLength - editor?.storage?.characterCount?.characters();
    };

    useEffect(() => {
      if (saveInitialValue !== null) return;

      if (editor && htmlContentInitial) {
        editor.commands.setContent(htmlContentInitial);
        setSaveInitialValue(htmlContentInitial);
      }
    }, [editor, htmlContentInitial, saveInitialValue]);

    useEffect(() => {
      if (editor) {
        const onUpdate = ({ editor }: any) => {
          const html = editor.getHTML();
          setUpdateHtmlContent(html);
        };

        editor.on('update', onUpdate);
        return () => {
          editor.off('update', onUpdate);
        };
      }
    }, [editor, setUpdateHtmlContent]);

    return (
      <div translate='no'>
        {label && (
          <p
            className={clsx('text-brand-label mb-2 text-[14px] font-medium', {
              'text-red-500': error,
            })}
          >
            {label}
          </p>
        )}
        {openModalEmoji && (
          <div className='absolute z-50'>
            <EmojiPicker
              onEmojiClick={(e) => {
                editor.chain().focus().insertContent(e.emoji).run();
                setOpenMenuEmoji(false);
              }}
            />
          </div>
        )}
        <div data-testid={dataTestid}>
          <div
            className={clsx('border-border-default rounded-md border', {
              'ring-1 ring-red-500': error,
            })}
          >
            <div className='min-h-[44px]'>
              <MenuBar
                editor={editor}
                setOpenMenuEmoji={setOpenMenuEmoji}
                maxLength={maxLength}
              />
            </div>
            <div className='bg-border-default h-[2px] w-full' />
            <EditorContent
              className='text-gray-700 max-h-[25rem] min-h-[8rem] cursor-text overflow-y-scroll [&_>_div]:min-h-[6.25rem] [&_>_div]:p-3'
              editor={editor}
              style={{ height: height ? height : 'max-content' }}
            />
          </div>
        </div>
        {error && (
          <div
            data-testid={`error-input-${name}`}
            className='flex items-center gap-[6px] pl-2 text-xs'
          >
            {error}
          </div>
        )}

        <div className='w-full rounded-b-md p-2'>
          <div className='character-count flex w-full items-center justify-between text-xs'>
            <p className='text-gray-600'>
              {charactersRemaining()} caracteres restantes
            </p>
          </div>
        </div>
      </div>
    );
  }
);
