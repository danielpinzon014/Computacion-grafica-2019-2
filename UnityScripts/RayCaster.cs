using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/*
 RAYCAST:
 Aplicar este script a la cámara.
*/

public class RayCaster : MonoBehaviour
{
    private GameObject objeto;
    private Color originalColor;
    private bool isCollision = false;

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        int bandera = 0;
        RaycastHit hit;
        for (float j = -10; j < 20; j++)
        {
            for (float i = -30; i < 40; i++)
            {
                Vector3 posicion = new Vector3();
                posicion = transform.TransformDirection(Vector3.forward);
                posicion.x = posicion.x + i / 10;
                posicion.y = posicion.y + j / 20;
                if (Physics.Raycast(transform.position, posicion, out hit, transform.GetComponent<Camera>().farClipPlane))
                {
                    Debug.DrawRay(transform.position, posicion * hit.distance, Color.yellow);
                    if (objeto != null)
                    {
                        if (isCollision && objeto.name != hit.collider.gameObject.name && bandera == 0)
                        {
                            objeto.GetComponent<MeshRenderer>().materials[0].color = originalColor;
                            objeto = hit.collider.gameObject;
                            originalColor = objeto.GetComponent<MeshRenderer>().materials[0].color;
                            hit.collider.gameObject.GetComponent<MeshRenderer>().materials[0].color = Color.red;
                            Debug.Log("Did Hit Another");
                            bandera = 1;
                        }
                    }
                    if (!isCollision && bandera == 0)
                    {
                        isCollision = true;
                        objeto = hit.collider.gameObject;
                        originalColor = objeto.GetComponent<MeshRenderer>().materials[0].color;
                        hit.collider.gameObject.GetComponent<MeshRenderer>().materials[0].color = Color.red;
                        Debug.Log("Did Hit");
                        bandera = 1;
                    }
                }
                else
                {
                    if (isCollision && bandera == 0)
                    {
                        isCollision = false;
                        objeto.GetComponent<MeshRenderer>().materials[0].color = originalColor;
                        //bandera=0;
                    }
                    Debug.DrawRay(transform.position, posicion * transform.GetComponent<Camera>().farClipPlane, Color.white);
                }
                /*if (bandera == 1)
                {
                    break;
                }*/
            }
            /*if (bandera == 1)
            {
                break;
            }*/

        }
        bandera = 0;
    }
}