using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BezierFollow : MonoBehaviour
{
    [SerializeField]
    private Transform[] routes;

    private int ir;

    private float Seguir;

    private Vector2 Trenchuchu;

    [SerializeField]
    public float speedModifier = 0.5f;

    private bool bravo;

    // Start is called before the first frame update
    void Start()
    {
        ir = 0;
        Seguir = 0f;
        bravo = true;
    }

    // Update is called once per frame
    void Update()
    {
        if (bravo)
        {
            StartCoroutine(GoByTheRouteRoutine(ir));
        }
    }

    private IEnumerator GoByTheRouteRoutine(int RutaNum)
    {
        bravo = false;

        Vector2 p0 = routes[RutaNum].GetChild(0).position;
        Vector2 p1 = routes[RutaNum].GetChild(1).position;
        Vector2 p2 = routes[RutaNum].GetChild(2).position;
        Vector2 p3 = routes[RutaNum].GetChild(3).position;

        while (Seguir < 1)
        {
            Seguir += Time.deltaTime * speedModifier;

            Trenchuchu = Mathf.Pow(1 - Seguir, 3) * p0 +
                3 * Mathf.Pow(1 - Seguir, 2) * Seguir * p1 +
                3 * (1 - Seguir) * Mathf.Pow(Seguir, 2) * p2 +
                Mathf.Pow(Seguir, 3) * p3;

            transform.position = Trenchuchu;
            yield return new WaitForEndOfFrame();
        }

        Seguir = 0f;

        ir += 1;

        if (ir > routes.Length - 1)
            ir = 0;

        bravo = true;

    }
}

