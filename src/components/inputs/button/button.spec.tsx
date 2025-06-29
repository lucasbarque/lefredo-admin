import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '.';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-family', 'primary');
    expect(button).toHaveAttribute('data-size', 'md');
    expect(button).toHaveAttribute('data-fullsize', 'false');
  });

  it('renders with custom family prop', () => {
    render(<Button family='secondary'>Secondary Button</Button>);

    const button = screen.getByRole('button', { name: 'Secondary Button' });
    expect(button).toHaveAttribute('data-family', 'secondary');
  });

  it('renders with custom size prop', () => {
    render(<Button size='lg'>Large Button</Button>);

    const button = screen.getByRole('button', { name: 'Large Button' });
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('renders with fullSize prop', () => {
    render(<Button fullSize>Full Width Button</Button>);

    const button = screen.getByRole('button', { name: 'Full Width Button' });
    expect(button).toHaveAttribute('data-fullsize', 'true');
  });

  it('renders loading spinner when isLoading is true', () => {
    render(<Button isLoading>Loading Button</Button>);

    const button = screen.getByRole('button', { name: 'Loading Button' });
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Clickable Button</Button>);

    const button = screen.getByRole('button', { name: 'Clickable Button' });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });

  it('passes through additional props', () => {
    render(
      <Button
        data-testid='custom-button'
        aria-label='Custom button'
        type='submit'
      >
        Custom Button
      </Button>
    );

    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders children correctly', () => {
    render(
      <Button>
        <span>Icon</span>
        <span>Text</span>
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Icon');
    expect(button).toHaveTextContent('Text');
  });

  it('applies correct CSS classes for different families', () => {
    const { rerender } = render(<Button family='primary'>Primary</Button>);
    let button = screen.getByRole('button', { name: 'Primary' });
    expect(button).toHaveClass('data-[family=primary]:bg-brand-default');

    rerender(<Button family='secondary'>Secondary</Button>);
    button = screen.getByRole('button', { name: 'Secondary' });
    expect(button).toHaveClass('data-[family=secondary]:text-brand-default');

    rerender(<Button family='tertiary'>Tertiary</Button>);
    button = screen.getByRole('button', { name: 'Tertiary' });
    expect(button).toHaveClass('data-[family=tertiary]:text-brand-default');
  });

  it('applies correct CSS classes for different sizes', () => {
    const { rerender } = render(<Button size='sm'>Small</Button>);
    let button = screen.getByRole('button', { name: 'Small' });
    expect(button).toHaveClass('data-[size=sm]:h-10');

    rerender(<Button size='md'>Medium</Button>);
    button = screen.getByRole('button', { name: 'Medium' });
    expect(button).toHaveClass('data-[size=md]:h-11');

    rerender(<Button size='lg'>Large</Button>);
    button = screen.getByRole('button', { name: 'Large' });
    expect(button).toHaveClass('data-[size=lg]:h-14');
  });

  it('applies full width class when fullSize is true', () => {
    render(<Button fullSize>Full Width</Button>);

    const button = screen.getByRole('button', { name: 'Full Width' });
    expect(button).toHaveClass('data-[fullsize=true]:w-full');
  });
});

describe('Button.Icon', () => {
  it('renders ButtonIcon component', () => {
    render(
      <Button>
        <Button.Icon>Icon Content</Button.Icon>
        Button Text
      </Button>
    );

    const icon = screen.getByText('Icon Content');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName).toBe('SPAN');
  });

  it('passes through props to ButtonIcon', () => {
    render(
      <Button>
        <Button.Icon data-testid='icon' aria-label='Icon label'>
          Icon
        </Button.Icon>
      </Button>
    );

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('aria-label', 'Icon label');
  });
});
