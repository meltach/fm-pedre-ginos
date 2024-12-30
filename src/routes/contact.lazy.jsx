import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { postContact } from '../api/postContact'

export const Route = createLazyFileRoute('/contact')({
  component: ContactRoute,
})

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function(e) {
      e.preventDefault()
      const formData = new FormData(e.target)
      return postContact(
        formData.get('name'),
        formData.get('email'),
         formData.get('message'),
      )
    }
  })


  return <div className="contact">
    <h1>Contact Us</h1>
    {mutation.isSuccess ? <h3>Submitted!</h3>:
      <form onSubmit={mutation.mutate}>
        <label>
          Name:
          <input name="name" type="text" />
        </label>
        <label>
          Email:
          <input name="email" type="email" />
        </label>
        <label>
          Message:
          <textarea name="message" />
        </label>
        <button type="submit">Submit</button>
      </form>
    }

  </div>
}
