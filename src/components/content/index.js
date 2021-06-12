import React, { FC, useRef, useState } from "react"

import { content, block, addUrl, modalBody } from "./index.module.less"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { Input, message, Modal } from "antd"
import { func } from "prop-types"

const Content = () => {
  const [visible, setVisible] = useState(false)
  const [tempList, setTempList] = useState([])
  const data = useStaticQuery(graphql`
    query {
      allWebsiteJson {
        nodes {
          name
          url
          img {
            childImageSharp {
              fixed(width: 48, height: 48) {
                height
                width
                src
                srcSet
              }
            }
          }
        }
      }
    }
  `)
  const tempData = useRef({ name: "", url: "" })
  const clearTempData = () => {
    tempData.current.name = ""
    tempData.current.url = ""
  }

  return (
    <div className={content}>
      {data.allWebsiteJson.nodes.map(n => (
        <section
          className={block}
          key={n.url}
          onClick={() => window.open(n.url, "__blank")}
        >
          <div>
            <Img fixed={n.img.childImageSharp.fixed} />
          </div>
          <div>{n.name}</div>
        </section>
      ))}
      {tempList.map(tl => (
        <section
          className={block}
          key={tl.url}
          onClick={() => window.open("http://www.baidu.com", "__blank")}
        >
          <div>
            {tl.img ? <Img fixed={tl.img.childImageSharp.fixed} /> : null}
          </div>
          <div>{tl.name}</div>
        </section>
      ))}
      <div className={`${block} ${addUrl}`} onClick={() => setVisible(true)}>
        <div>+</div>
        <div>添加快捷方式</div>
      </div>
      <Modal
        title="添加快捷方式"
        visible={visible}
        onCancel={() => {
          setVisible(false)
          clearTempData()
        }}
        cancelButtonProps={{}}
        okButtonProps={{}}
        cancelText="取消"
        okText="完成"
        destroyOnClose
        onOk={() => {
          if (!tempData.current.name || !tempData.current.url) {
            message.warn("请输入名字和url")
            return
          }
          if (tempList.some(tl => tl.url === tempData.current.url)) {
            message.warn("url重复")
            return
          }
          const newList = [...tempList]
          newList.push({ ...tempData.current })
          setTempList(newList)
          setVisible(false)
          clearTempData()
        }}
      >
        <section className={modalBody}>
          <div>
            <label>名称</label>
            <Input
              onChange={e => {
                tempData.current.name = e.target.value.trim()
              }}
            />
          </div>
          <div>
            <label>网址</label>
            <Input
              onChange={e => {
                tempData.current.url = e.target.value.trim()
              }}
            />
          </div>
        </section>
      </Modal>
    </div>
  )
}

export default Content
