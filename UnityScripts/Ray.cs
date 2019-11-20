using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Ray : MonoBehaviour
{
    private GameObject objeto;
    private Color originalColor;
    private bool isCollision = false;
    private Color color2 = new Color(2.5f,0.0f,0.0f,0.25f);
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        RaycastHit hit;
        if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), out hit, transform.GetComponent<Camera>().farClipPlane))
        {
            Debug.DrawRay(transform.position, transform.TransformDirection(Vector3.forward) * hit.distance, Color.yellow);
            if (objeto != null)
            {
                if (isCollision && objeto.name != hit.collider.gameObject.name)
                {
                    objeto.GetComponent<MeshRenderer>().materials[0].color = originalColor;
                    objeto = hit.collider.gameObject;
                    originalColor = objeto.GetComponent<MeshRenderer>().materials[0].color;
                    hit.collider.gameObject.GetComponent<MeshRenderer>().materials[0].color = color2;
                    Debug.Log("Did Hit Another");
                }
            }
            if (!isCollision)
            {
                isCollision = true;
                objeto = hit.collider.gameObject;
                originalColor = objeto.GetComponent<MeshRenderer>().materials[0].color;
                hit.collider.gameObject.GetComponent<MeshRenderer>().materials[0].color = color2;
                Debug.Log("Did Hit");
            }
        }
        else
        {
            if (isCollision)
            {
                isCollision = false;
                objeto.GetComponent<MeshRenderer>().materials[0].color = originalColor;
            }
            Debug.DrawRay(transform.position, transform.TransformDirection(Vector3.forward) * transform.GetComponent<Camera>().farClipPlane, Color.white);
        }
    }
}