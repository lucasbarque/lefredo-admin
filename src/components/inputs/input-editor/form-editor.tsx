/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import CharacterCount from '@tiptap/extension-character-count';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import EmojiPicker from 'emoji-picker-react';

import '@/styles/tiptap.css';

import { FormEditorProps, FormEditorRefProps } from './form-editor.types';
import { MenuBar } from './menu-bar';

export const FormEditor = forwardRef<FormEditorRefProps, FormEditorProps>(
  (
    {
      setUpdateHtmlContent,
      htmlContentInitial,
      dataTestid,
      label,
      error,
      name,
      disabled = false,
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

    const editor = useEditor({
      editable: !disabled,
      immediatelyRender: false,
      extensions: [
        Link.configure({
          openOnClick: false,
          autolink: true,
          defaultProtocol: 'https',
          protocols: ['http', 'https'],
          isAllowedUri: (url, ctx) => {
            try {
              const parsedUrl = url.includes(':')
                ? new URL(url)
                : new URL(`${ctx.defaultProtocol}://${url}`);

              if (!ctx.defaultValidate(parsedUrl.href)) {
                return false;
              }

              const disallowedProtocols = ['ftp', 'file', 'mailto'];
              const protocol = parsedUrl.protocol.replace(':', '');

              if (disallowedProtocols.includes(protocol)) {
                return false;
              }

              const allowedProtocols = ctx.protocols.map((p) =>
                typeof p === 'string' ? p : p.scheme
              );

              if (!allowedProtocols.includes(protocol)) {
                return false;
              }

              const disallowedDomains = [
                'example-phishing.com',
                'malicious-site.net',
              ];
              const domain = parsedUrl.hostname;

              if (disallowedDomains.includes(domain)) {
                return false;
              }

              return true;
            } catch {
              return false;
            }
          },
          shouldAutoLink: (url) => {
            try {
              const parsedUrl = url.includes(':')
                ? new URL(url)
                : new URL(`https://${url}`);

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

    useEffect(() => {
      if (!disabled) {
        editor?.setEditable(true);
      }
    }, [disabled]);

    return (
      <div data-is-disabled={disabled} className='group'>
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
                editor?.chain().focus().insertContent(e.emoji).run();
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
                isDisabled={disabled}
              />
            </div>
            <div className='bg-border-default h-[2px] w-full' />
            <EditorContent
              className='max-h-[25rem] min-h-[8rem] cursor-text overflow-y-scroll text-gray-700 [&_>_div]:min-h-[6.25rem] [&_>_div]:p-3'
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

        <div className='w-full rounded-b-md pt-2'>
          <div className='character-count flex w-full items-center justify-between text-xs'>
            <p className='text-gray-600'>
              {charactersRemaining() || 0} caracteres restantes
            </p>
          </div>
        </div>
      </div>
    );
  }
);
