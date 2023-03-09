
// 加载选中的文档
import mdController from '../service/md.js'
// 状态
import { store } from '@naturefw/nf-state'
// 路由
import { useRouter } from '../router'

/**
 * 菜单相关的设置
 * @param {*} domMenu 菜单对象，用于展开菜单项
 * @param {*} menus 当前导航项对应的菜单集合
 * @returns 
 */
export default function menuController(domMenu, menus) {

  const { current } = store // 当前激活的各种项目
  const router = useRouter() // 路由

  /**
   * 根据菜单项加载文档
   */
  const setDoc = () => {
    const { loadDocById } = mdController()

    loadDocById(current.menuInfo.menuId, current.ver).then((res) => {
      // 找到了文档
      Object.assign(current.docInfo, res)
    }).catch((res) => {
      // 没有文档
      Object.assign(current.docInfo, res)
    })
  }

  /**
   * 设置面包屑
   */
  const setBreadcrumb = (indexPath) => {
    const breadcrumb = current.breadcrumb

    // 设置每级菜单的名称
    breadcrumb.length = 0
    let parentNode = {}
    indexPath.forEach((id, index) => {
      let tempMenu = null
      if (index === 0) {
        tempMenu = menus.find(item => item.menuId == id)
      } else {
        tempMenu = parentNode.find(item => item.menuId == id)
      }
      parentNode = tempMenu.children

      // 面包屑定位
      breadcrumb.push({
        menuId: id,
        path: indexPath,
        text: tempMenu.text
      })
    })
  }


  let isSelected = false

  /**
   * 二级菜单被选中
   * @param {*} index 
   * @param {*} indexPath 
   */
  const select = (index, indexPath) => {
    isSelected = indexPath.length === 1
    // console.log('当前激活节点', index, indexPath)
    current.menuInfo.menuId = index
    // 设置面包屑
    setBreadcrumb(indexPath)

    // 根据菜单项ID，设置文档
    setDoc()

  }

  /**
   * 菜单被打开
   * @param {*} index 
   * @param {*} indexPath 
   * @returns 
   */
  const open = (index, indexPath) => {
    // 如果选择了，那么退出
    if (isSelected) {
      isSelected = false
      return
    }
    // console.log('当前激活节点', index, indexPath)
    current.menuInfo.menuId = index
    // 设置面包屑
    setBreadcrumb(indexPath)

    // 根据菜单项ID，设置文档
    setDoc()

  }

  /**
   * 菜单被收拢，然后强行打开
   */
  const close = (index, indexPath) => {
    domMenu.value.open(index)
  }

  /**
   * 导航项ID变化后，设置路由、菜单、面包屑和加载文档
   */
  const watchNaviId = () => {
    
    setTimeout(() => {
      let menuPath = []
      if (router.menuPath.length > 0) {
        // 初始状态，依据URL加载菜单
        menuPath.push(...router.menuPath)
        router.menuPath.length = 0
      } else {
        menuPath.push(menus[0].menuId)
      }
      menuPath.forEach((menu, index) => {
        if (index < menuPath.length - 1) {
          domMenu.value.open(menu)
        } else {
          current.menuInfo.menuId = menu
        }
      })
      // 设置面包屑
      setBreadcrumb(menuPath)
      // 根据菜单项ID，设置文档
      setDoc()
    }, 300)
  }


  return {
    // setDoc,
    // setBreadcrumb,
    watchNaviId,
    select,
    open,
    close
  }
}