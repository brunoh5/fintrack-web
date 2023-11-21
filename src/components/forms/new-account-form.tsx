'use client'

import { FormEvent, useState } from 'react'
import Cookie from 'js-cookie'
import { X } from 'lucide-react'

import { Button } from '../ui/button'
import { Input } from '../ui/Input'
import { api } from '@/lib/api'
import { toast } from '../ui/use-toast'

export function NewAccountForm() {
  const token = Cookie.get('token')

  const [isOpen, setIsOpen] = useState(false)

  const [formattedNumber, setFormattedNumber] = useState('')

  async function handleCreateAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const data = {
      type: formData.get('type'),
      bank: formData.get('bank'),
      number: formattedNumber.replace(/\s/g, ''),
      initialAmount: formData.get('initialAmount'),
    }

    try {
      api.post('/accounts', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setIsOpen(false)
      setFormattedNumber('')
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong',
        description: `${err}`,
      })
    }
  }

  function formatAccountNumber(value: string): string {
    const accountNumber = value?.replace(/\D/g, '')
    return accountNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/g, '$1 $2 $3 $4')
  }

  return (
    <div className="flex h-72 flex-col items-center rounded-lg bg-white px-6 pb-[88px] pt-[100px]">
      <div className="w-[208px]">
        <Button onClick={() => setIsOpen(true)}>Add Accounts</Button>
        <button className="px-6 py-3">Edit Accounts</button>
      </div>

      <div
        className="z-10 absolute hidden bg-gray-950/20 bottom-0 left-0 right-0 top-0 items-center justify-center transition-all data-[active=true]:flex"
        role="dialog"
        aria-modal="true"
        data-active={isOpen === true}
      >
        <div className="relative rounded-2xl bg-white px-16 pt-16 pb-12 w-full max-w-[488px]">
          <button
            className="absolute top-8 right-8 group"
            onClick={() => setIsOpen(false)}
          >
            <X
              size={32}
              className="text-gray-900 group-hover:text-chili-red transition-colors"
            />
          </button>

          <form
            onSubmit={handleCreateAccount}
            className="gap-8 flex flex-col items-center w-full"
          >
            <Input.Root>
              <Input.Label name="type" text="Account Type" />
              <Input.Wrapper>
                <Input.Content name="type" autoComplete="off" />
              </Input.Wrapper>
            </Input.Root>

            <Input.Root>
              <Input.Label name="bank" text="Bank" />
              <Input.Wrapper>
                <Input.Content name="bank" autoComplete="off" />
              </Input.Wrapper>
            </Input.Root>

            <Input.Root>
              <Input.Label name="number" text="Account Number" />
              <Input.Wrapper>
                <Input.Content
                  name="number"
                  autoComplete="off"
                  value={formattedNumber}
                  onChange={(e) =>
                    setFormattedNumber(formatAccountNumber(e.target.value))
                  }
                  maxLength={16}
                />
              </Input.Wrapper>
            </Input.Root>

            <Input.Root>
              <Input.Label name="initialAmount" text="Initial Amount" />
              <Input.Wrapper>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pr-9">
                  <span className="text-gray-500 sm:text-sm">R$</span>
                </div>
                <Input.Content name="initialAmount" autoComplete="off" />
              </Input.Wrapper>
            </Input.Root>

            <div className="flex justify-center w-full">
              <Button className="max-w-[192px]" type="submit">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
