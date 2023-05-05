import Script from 'next/script'

export const Subscribe = ({ substackUsername }) => {
  if (typeof window !== 'undefined') {
    window.CustomSubstackWidget = {
      substackUrl: `${substackUsername}.substack.com`,
      placeholder: 'example@gmail.com',
      buttonText: 'Subscribe',
      theme: 'custom',
      colors: {
        primary: '#60A5FA',
        input: '#FFFFFF',
        email: '#60A5FA',
        text: '#FFFFFF',
      },
    }
  }
  return (
    <>
      <div id="custom-substack-embed" className="text-base max-w-sm h-8"></div>
      <Script src="https://substackapi.com/widget.js" />
    </>
  )
}
