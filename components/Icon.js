import { createFromIconfontCN } from '@ant-design/icons'

const Iconfont = createFromIconfontCN({
  scriptUrl: [
      '//at.alicdn.com/t/c/font_3872170_w14hrjq3ay.js'
  ],
})

export default function Icon({name}) {
  return (
    <Iconfont type={`icon-${name}`}></Iconfont>
  )
}