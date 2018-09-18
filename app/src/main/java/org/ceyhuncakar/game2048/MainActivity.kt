package org.ceyhuncakar.game2048

import android.os.Build
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.annotation.RequiresApi
import android.util.Log
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    var tiles = "[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val myWebView: WebView = findViewById(R.id.webview)
        myWebView!!.settings.javaScriptEnabled = true
        myWebView!!.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                myWebView!!.evaluateJavascript("init($tiles)") { value ->
                    tiles = value
                }
            }
        }
        myWebView!!.loadUrl("file:///android_asset/index.html")

        btnLeft.setOnClickListener {
            myWebView!!.evaluateJavascript("left($tiles)") {value ->
                tiles = value
            }
        }

        btnUp.setOnClickListener {
            myWebView!!.evaluateJavascript("up($tiles)") {value ->
                tiles = value
            }
        }

        btnRight.setOnClickListener {
            myWebView!!.evaluateJavascript("right($tiles)") {value ->
                tiles = value
            }
        }

        btnDown.setOnClickListener {
            myWebView!!.evaluateJavascript("down($tiles)") {value ->
                tiles = value
            }
        }
    }
}
