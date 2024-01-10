using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ScenicController : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        // Vector2  先简单理解为存储两个值的变量:位置：position （想想上面Inspector窗口TransForm属性）
        Vector2 position = transform.position;
        // 修改x坐标
        position.x = position.x + 0.01f;
        // 改完坐标后，再把属性设置给 transform
        transform.position = position;
    }
}
